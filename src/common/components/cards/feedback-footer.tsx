import * as React from 'react';
import { NamedFC } from 'common/react/named-fc';
import styles from './feedback-footer.scss';
import { ThumbsUpIcon } from 'common/icons/thumbs-up-icon';
import { ThumbsDownIcon } from 'common/icons/thumbs-down-icon';

// Creating CSS styles that will be extracted by the build system
/* export const feedbackFooterStyles = {
  feedbackFooter: 'feedback-footer',
  feedbackText: 'feedback-text',
  feedbackButtons: 'feedback-buttons',
  feedbackButton: 'feedback-button'
}; */

export interface FeedbackFooterProps {
    instanceId: string;
    feedbackURL: string;
}

export const FeedbackFooter = NamedFC<FeedbackFooterProps>(
  'FeedbackFooter',
  props => {
    const { instanceId, feedbackURL } = props;

    // Build feedback URLs with the instance ID as a parameter
    const buildFeedbackUrl = (type: string) => {
      if (!feedbackURL) {
        return '#'; // Return a safe fallback if feedbackURL is not provided
      }
      
      // Ensure feedbackURL is properly formatted
      const baseUrl = feedbackURL.endsWith('/') ? feedbackURL : `${feedbackURL}/`;
      //return `${baseUrl}feedback?type=${type}&element=${instanceId}`;

      return `${baseUrl}`;
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
          <span className={styles.aiContentLabel}>AI-generated content may be incorrect</span>
        </div>
      </div>
    );
  }
);
