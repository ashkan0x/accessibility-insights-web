import * as React from 'react';
import { NamedFC } from 'common/react/named-fc';
import styles from './feedback-footer.scss';
import { ThumbsUpIcon } from 'common/icons/thumbs-up-icon';
import { ThumbsDownIcon } from 'common/icons/thumbs-down-icon';

// Creating CSS styles that will be extracted by the build system
export const feedbackFooterStyles = {
  feedbackFooter: 'feedback-footer',
  feedbackText: 'feedback-text',
  feedbackButtons: 'feedback-buttons',
  feedbackButton: 'feedback-button'
};

export interface FeedbackFooterProps {
    instanceId: string;
}

export const FeedbackFooter = NamedFC<FeedbackFooterProps>(
  'FeedbackFooter',
  props => {
    const { instanceId } = props;

    // Build feedback URLs with the instance ID as a parameter
    const buildFeedbackUrl = (type: string) => {
      return `https://example.com/feedback?type=${type}&element=${instanceId}`;
    };

    return (
      <div className={styles.feedbackFooter}>
        {/* <span className={feedbackFooterStyles.feedbackText}>Was this result helpful?</span> */}
        <div className={styles.feedbackButtons}>
          <a 
            href={buildFeedbackUrl('thumbsup')} 
            className={styles.feedbackButton} 
            title="Helpful"
          >
            <ThumbsUpIcon />
          </a>
          <a 
            href={buildFeedbackUrl('thumbsdown')} 
            className={styles.feedbackButton} 
            title="Unhelpful"
          >
            <ThumbsDownIcon />
          </a>
        </div>
      </div>
    );
  }
);
