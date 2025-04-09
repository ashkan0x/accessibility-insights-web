// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const addCopyToClipboardListener = function (doc: Document): void {
    // This function will be called when the static HTML is loaded
    const copyToClipboard = function(instanceId: string): void {
        // Find content element if it exists
        const contentId = `copy-content-${instanceId.replace(/[^a-zA-Z0-9]/g, '')}`;
        const contentElement = doc.getElementById(contentId);
        const textToCopy = contentElement ? contentElement.textContent || '' : instanceId;
        
        // Create temporary textarea for copying
        const textarea = doc.createElement('textarea');
        textarea.value = textToCopy;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        doc.body.appendChild(textarea);
        
        // Copy content
        textarea.select();
        doc.execCommand('copy');
        doc.body.removeChild(textarea);
        
        // Show notification if it exists
        const notificationId = `copy-notification-${instanceId.replace(/[^a-zA-Z0-9]/g, '')}`;
        const notificationElement = doc.getElementById(notificationId);
        if (notificationElement) {
            notificationElement.style.display = 'inline';
            setTimeout(function() {
                notificationElement.style.display = 'none';
            }, 2000);
        }
    };

    // Add click handlers to all copy buttons
    const copyButtons = doc.querySelectorAll('button[id^="copy-button-"]');
    for (let i = 0; i < copyButtons.length; i++) {
        const button = copyButtons[i];
        const buttonId = button.id;
        const instanceId = buttonId.replace('copy-button-', '');
        
        button.addEventListener('click', function(): void {
            copyToClipboard(instanceId);
        });
    }
};

export const getCopyToClipboardScript = (code: string | Function): string =>
    `(${String(code)})(document)`;

export const getDefaultCopyToClipboardScript = (): string =>
    getCopyToClipboardScript(addCopyToClipboardListener);
