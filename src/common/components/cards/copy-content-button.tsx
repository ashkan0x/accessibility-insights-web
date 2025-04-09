import * as React from 'react';
import { NamedFC } from 'common/react/named-fc';
import styles from './failed-instances-markup-footer.scss';
import { CopyDetailsIcon } from 'common/icons/copy-details-icon';

/**
 * This component provides the DOM structure for the copy functionality.
 * The actual copy behavior is implemented in an external script that gets
 * included in the final HTML.
 * 
 * The external script will:
 * 1. Attach an event handler to the button with ID pattern: copy-button-[cleanInstanceId]
 * 2. Copy text from the element with ID pattern: copy-content-[cleanInstanceId]
 * 3. Display the notification with ID pattern: copy-notification-[cleanInstanceId]
 */
export interface CopyContentButtonProps {
    instanceId: string;
    contentToCopy?: string;
}

export const CopyContentButton = NamedFC<CopyContentButtonProps>(
    'CopyContentButton',
    ({ instanceId, contentToCopy }) => {
        const cleanInstanceId = instanceId.replace(/[^a-zA-Z0-9]/g, '');
        const copyButtonId = `copy-button-${cleanInstanceId}`;
        const copyContentId = `copy-content-${cleanInstanceId}`;
        const notificationId = `copy-notification-${cleanInstanceId}`;

        return (
            <>
                <button 
                    id={copyButtonId} 
                    className={styles.feedbackButton} 
                    title="Copy failure details"
                    aria-label="Copy failure details to clipboard"
                    aria-describedby={contentToCopy ? copyContentId : undefined}
                >
                    <CopyDetailsIcon />
                    <span>Copy Failure Details</span>
                </button>
                {contentToCopy && (
                    <span id={copyContentId} className={styles.hiddenContent}>
                        {contentToCopy}
                    </span>
                )}
                <div className={styles.notificationContainer}>
                    <span id={notificationId} className={styles.copyNotification} role="status" aria-live="polite">
                        Copied failure details!
                    </span>
                </div>
            </>
        );
    },
);
