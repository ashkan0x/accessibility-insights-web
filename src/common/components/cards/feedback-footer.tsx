import * as React from 'react';
import { NamedFC } from 'common/react/named-fc';
import styles from './feedback-footer.scss';
import { ThumbsUpIcon } from 'common/icons/thumbs-up-icon';
import { ThumbsDownIcon } from 'common/icons/thumbs-down-icon';
import { CopyDetailsIcon } from 'common/icons/copy-details-icon';

export interface FeedbackFooterProps {
    instanceId: string;
    feedbackURL?: string;
    contentToCopy?: string;
}

export const FeedbackFooter = NamedFC<FeedbackFooterProps>(
  'FeedbackFooter',
  props => {
    const { instanceId, feedbackURL, contentToCopy } = props;
    
    // Build feedback URLs with the instance ID as a parameter
    const buildFeedbackUrl = (type: string) => {
      if (!feedbackURL) {
        return '#';
      }
      
      const baseUrl = feedbackURL.endsWith('/') ? feedbackURL : `${feedbackURL}/`;
      return `${baseUrl}?feedback=${type}&instanceId=${encodeURIComponent(instanceId)}`;
    };

    const cleanInstanceId = instanceId.replace(/[^a-zA-Z0-9]/g, '');
    const copyButtonId = `copy-button-${cleanInstanceId}`;
    const copyContentId = `copy-content-${cleanInstanceId}`;
    const notificationId = `copy-notification-${cleanInstanceId}`;

    // Function for interactive use in the app
    const copyToClipboard = () => {
      const textToCopy = contentToCopy || instanceId;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          const notification = document.getElementById(notificationId);
          if (notification) {
            notification.style.display = 'inline';
            setTimeout(() => {
              notification.style.display = 'none';
            }, 2000);
          }
        })
        .catch(err => console.error('Could not copy text: ', err));
    };

    return (
        <div className={styles.feedbackFooter}>
            <div className={styles.feedbackGroupLeft}>
                {feedbackURL && (
                    <>
                        <a 
                            href={buildFeedbackUrl('helpful')} 
                            className={styles.feedbackButton} 
                            title="Helpful"
                        >
                            <ThumbsUpIcon />
                        </a>
                        <a 
                            href={buildFeedbackUrl('unhelpful')} 
                            className={styles.feedbackButton} 
                            title="Unhelpful"
                        >
                            <ThumbsDownIcon />
                        </a>
                        <span className={styles.aiContentLabel}>AI-generated content may be incorrect</span>
                    </>
                )}
            </div>
            
            <div className={styles.feedbackGroupRight}>
                <button 
                    id={copyButtonId}
                    className={styles.feedbackButton}
                    title="Copy content"
                    onClick={copyToClipboard}
                >

                    <CopyDetailsIcon />
                    <span>Copy Failure Details</span>
                </button>
                {contentToCopy && (
                    <span id={copyContentId} style={{ display: 'none' }}>
                        {contentToCopy}
                    </span>
                )}
                <div className={styles.notificationContainer}>
                    <span 
                        id={notificationId} 
                        className={styles.copyNotification} 
                        style={{ display: 'none' }}
                    >
                        Copied failure details!
                    </span>
                </div>
            </div>
        </div>
    );
  }
);
