import * as React from 'react';
import { NamedFC } from 'common/react/named-fc';
import styles from './failed-instances-markup-footer.scss';
import { CardInteractionSupport } from './card-interaction-support';
import { HelpfulButtons } from './helpful-buttons';
import { CopyContentButton } from './copy-content-button';

export type FeedbackFooterDeps = {
    cardInteractionSupport: CardInteractionSupport;
};

export interface FeedbackFooterProps {
    deps: FeedbackFooterDeps;
    instanceId: string;
    feedbackURL?: string;
    contentToCopy?: string;
}

export const MarkupFooter = NamedFC<FeedbackFooterProps>(
    'MarkupFooter',
    props => {
        const { deps, instanceId, feedbackURL, contentToCopy } = props;

        if (!deps.cardInteractionSupport.supportsCopyFailureDetailsInMarkup) {
            return null;
        }

        return (
            <div className={styles.feedbackFooter}>
                <div className={styles.feedbackGroupLeft}>
                    {feedbackURL && <HelpfulButtons feedbackURL={feedbackURL} instanceId={instanceId} />}
                </div>

                <div className={styles.feedbackGroupRight}>
                    <CopyContentButton instanceId={instanceId} contentToCopy={contentToCopy} />
                </div>
            </div>
        );
    },
);
