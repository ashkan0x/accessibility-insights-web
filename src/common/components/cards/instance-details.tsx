// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import classNames from 'classnames';
import { CardSelectionMessageCreator } from 'common/message-creators/card-selection-message-creator';
import { NamedFC } from 'common/react/named-fc';
import { MarkupFooter } from './failed-instances-markup-footer';
import { CardResult } from 'common/types/store-data/card-view-model';
import { NarrowModeStatus } from 'DetailsView/components/narrow-mode-detector';
import { forOwn, isEmpty } from 'lodash';
import * as React from 'react';
import styles from 'reports/components/instance-details.scss';
import {
    CardRowDeps,
    PropertyConfiguration,
} from '../../../common/configs/unified-result-property-configurations';
import {
    StoredInstancePropertyBag,
    TargetAppData,
    UnifiedRule,
} from '../../../common/types/store-data/unified-data-interface';
import { UserConfigurationStoreData } from '../../types/store-data/user-configuration-store';
import { InstanceDetailsFooter, InstanceDetailsFooterDeps } from './instance-details-footer';

export const instanceCardAutomationId = 'instance-card';

export type InstanceDetailsDeps = {
    getPropertyConfigById: (id: string) => PropertyConfiguration;
} & CardRowDeps &
    InstanceDetailsFooterDeps;

export type InstanceDetailsProps = {
    deps: InstanceDetailsDeps;
    result: CardResult;
    index: number;
    userConfigurationStoreData: UserConfigurationStoreData | null;
    targetAppInfo: TargetAppData;
    rule: UnifiedRule;
    cardSelectionMessageCreator?: CardSelectionMessageCreator;
    narrowModeStatus?: NarrowModeStatus;
    feedbackURL?: string;
};

// Feedback mechanism is only enabled for results with the following guidance tags
const FEEDBACK_ENABLED_TAGS = ['BEST_PRACTICE'];

export const InstanceDetails = NamedFC<InstanceDetailsProps>('InstanceDetails', props => {
    const {
        result,
        deps,
        userConfigurationStoreData,
        rule,
        targetAppInfo,
        cardSelectionMessageCreator,
        narrowModeStatus,
        feedbackURL
    } = props;
    const [cardFocused, setCardFocus] = React.useState(false);

    const isHighlightSupported: boolean = deps.cardInteractionSupport.supportsHighlighting;
    const enableHTMLCopyButton: boolean = deps.cardInteractionSupport.supportsCopyFailureDetailsInMarkup ?? false;

    const hasFeedbackEnabledTag = () => {
        if (!rule || !rule.guidance) return false;

        return rule.guidance.some(guidanceLink =>
            guidanceLink.tags && guidanceLink.tags.some(tag => FEEDBACK_ENABLED_TAGS.includes(tag.id)),
        );
    };

    const instanceDetailsCardStyling = classNames({
        [styles.instanceDetailsCard]: true,
        [styles.selected]: isHighlightSupported && result.isSelected,
        [styles.focused]: isHighlightSupported && cardFocused,
        [styles.interactive]: isHighlightSupported,
    });

    const instanceDetailsCardContainerStyling = classNames({
        [styles.instanceDetailsCardContainer]: true,
        [styles.selected]: isHighlightSupported && result.isSelected,
    });

    const toggleSelectHandler = (event: React.SyntheticEvent): void => {
        event.stopPropagation();
        cardSelectionMessageCreator?.toggleCardSelection(result.ruleId, result.uid, event);
    };

    const hiddenButton = React.useRef<HTMLButtonElement>(null);
    const cardHighlightingProperties = isHighlightSupported
        ? {
              onClick: (event: React.SyntheticEvent): void => {
                  if (!(event?.target instanceof HTMLButtonElement)) {
                      hiddenButton.current?.focus();
                      hiddenButton.current?.click();
                  }
              },
              tabIndex: -1,
          }
        : {};

    return (
        <div
            data-automation-id={instanceCardAutomationId}
            className={instanceDetailsCardContainerStyling}
        >
            <div className={instanceDetailsCardStyling} {...cardHighlightingProperties}>
                <div>
                    <table className={styles.reportInstanceTable}>
                        <tbody>
                            {renderCardRowsForPropertyBag(result.identifiers, props)}
                            {renderCardRowsForPropertyBag(result.descriptors, props)}
                            {renderCardRowsForPropertyBag(result.resolution, props)}
                        </tbody>
                    </table>
                    {isHighlightSupported && cardSelectionMessageCreator !== undefined && (
                        <button
                            ref={hiddenButton}
                            onClick={toggleSelectHandler}
                            className={styles.hiddenHighlightButton}
                            aria-label={`highlight ${
                                result.identifiers && result.identifiers.identifier
                                    ? result.identifiers.identifier
                                    : ''
                            }`}
                            aria-pressed={result.isSelected}
                            onFocus={_ => setCardFocus(true)}
                            onBlur={_ => setCardFocus(false)}
                        ></button>
                    )}
                    <InstanceDetailsFooter
                        deps={deps}
                        result={result}
                        userConfigurationStoreData={userConfigurationStoreData}
                        rule={rule}
                        targetAppInfo={targetAppInfo}
                        narrowModeStatus={narrowModeStatus}
                    />
                    <MarkupFooter 
                        deps={deps}
                        instanceId={result.uid}
                        contentToCopy={buildCopyContent(result)} 
                        feedbackURL={hasFeedbackEnabledTag() ? feedbackURL : undefined}
                    />
                </div>
            </div>
        </div>
    );
});

const buildCopyContent = (result: CardResult): string => {
    const parts: string[] = [];
    
    // Add Snippet
    if (result.descriptors?.snippet) {
        parts.push(`Snippet: ${result.descriptors.snippet}`);
    }
    
    // Add Path (could be in identifiers.target or similar field)
    if (result.identifiers?.target) {
        parts.push(`Path: ${result.identifiers.target}`);
    }
    
    // Add Related Paths
    if (result.descriptors?.relatedCssSelectors?.length) {
        parts.push(`Related Paths:\n${result.descriptors.relatedCssSelectors.map(path => `- ${path}`).join('\n')}`);
    }
    
    // Add How to fix
    if (result.resolution?.howToFixSummary) {
        parts.push(`How to fix:\n${result.resolution.howToFixSummary}`);
    } else if (result.resolution?.failureSummary) {
        parts.push(`How to fix:\n${result.resolution.failureSummary}`);
    }
    
    return parts.join('\n\n');
};

const renderCardRowsForPropertyBag = (
    propertyBag: StoredInstancePropertyBag,
    props: InstanceDetailsProps,
) => {
    let propertyIndex = 0;
    const cardRows: JSX.Element[] = [];
    forOwn(propertyBag, (propertyData, propertyName) => {
        const propertyConfig = props.deps.getPropertyConfigById(propertyName);
        if (!isEmpty(propertyConfig)) {
            const CardRow = propertyConfig.cardRow;
            ++propertyIndex;
            cardRows.push(
                <CardRow
                    deps={props.deps}
                    propertyData={propertyData}
                    index={props.index}
                    key={`${propertyName}-${propertyIndex}`}
                />,
            );
        }
    });
    return <>{cardRows}</>;
};
