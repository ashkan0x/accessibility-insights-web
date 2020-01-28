// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

function iconSet(key) {
    return {
        icon16: `icons/brand/${key}/brand-${key}-16px.png`,
        icon48: `icons/brand/${key}/brand-${key}-48px.png`,
        icon128: `icons/brand/${key}/brand-${key}-128px.png`,
        icon512: `icons/brand/${key}/brand-${key}-512px.png`,
    };
}

const icons = {
    dev: iconSet('gray'),
    playground: iconSet('green'),
    insider: iconSet('violet'),
    canary: iconSet('red'),
    production: iconSet('blue'),
};

const commonExtensionOptions = {
    fullName: 'Accessibility Insights for Web',
    extensionDescription: 'Accessibility Insights for Web helps developers quickly find and fix accessibility issues.',
    bundled: true,
    productCategory: 'extension',
};

const commonUnifiedOptions = {
    fullName: 'Accessibility Insights for Android',
    bundled: true,
    productCategory: 'electron',
};

module.exports = {
    dev: {
        config: {
            options: {
                ...commonExtensionOptions,
                ...icons.dev,
                fullName: 'Accessibility Insights for Web - Dev',
                telemetryBuildName: 'Dev',
            },
        },
        bundleFolder: 'devBundle',
        mustExistFile: 'background.bundle.js',
    },
    playground: {
        release: true,
        config: {
            options: {
                ...commonExtensionOptions,
                ...icons.playground,
                fullName: 'Accessibility Insights for Web - Playground',
                telemetryBuildName: 'Playground',
            },
        },
        bundleFolder: 'devBundle',
        mustExistFile: 'background.bundle.js',
    },
    canary: {
        release: true,
        config: {
            options: {
                ...commonExtensionOptions,
                ...icons.canary,
                fullName: 'Accessibility Insights for Web - Canary',
                telemetryBuildName: 'Canary',
            },
        },
        bundleFolder: 'devBundle',
        mustExistFile: 'background.bundle.js',
    },
    insider: {
        release: true,
        config: {
            options: {
                ...commonExtensionOptions,
                ...icons.insider,
                fullName: 'Accessibility Insights for Web - Insider',
                telemetryBuildName: 'Insider',
            },
        },
        bundleFolder: 'prodBundle',
        mustExistFile: 'background.bundle.js',
    },
    production: {
        release: true,
        config: {
            options: {
                ...commonExtensionOptions,
                ...icons.production,
                telemetryBuildName: 'Production',
            },
        },
        bundleFolder: 'prodBundle',
        mustExistFile: 'background.bundle.js',
    },
    // to be changed later to unified-dev
    electron: {
        config: {
            options: {
                ...commonUnifiedOptions,
                ...icons.dev,
                fullName: 'Accessibility Insights for Android - Dev',
                telemetryBuildName: 'AI Android - Dev',
            },
        },
        bundleFolder: 'electronBundle',
        mustExistFile: 'main.bundle.js',
    },
    'unified-canary': {
        release: true,
        config: {
            options: {
                ...commonUnifiedOptions,
                ...icons.canary,
                fullName: 'Accessibility Insights for Android - Canary',
                telemetryBuildName: 'AI Android - Canary',
            },
        },
        bundleFolder: 'electronBundle',
        mustExistFile: 'main.bundle.js',
        // Note: this non-canary-looking appId is intentional for backcompat
        appId: 'com.microsoft.accessibilityinsights',
        publishUrl: 'https://a11yinsightsandroidblob.blob.core.windows.net/aimobile-canary',
        telemetryKeyIdentifier: 'unified-canary-instrumentation-key',
    },
    'unified-insider': {
        release: true,
        config: {
            options: {
                ...commonUnifiedOptions,
                ...icons.insider,
                fullName: 'Accessibility Insights for Android - Insider',
                telemetryBuildName: 'AI Android - Insider',
            },
        },
        bundleFolder: 'electronBundle',
        mustExistFile: 'main.bundle.js',
        appId: 'com.microsoft.accessibilityinsights.unified.insider',
        publishUrl: 'https://a11yinsightsandroidblob-insiders.blob.core.windows.net/aimobile-insiders',
        telemetryKeyIdentifier: 'unified-insider-instrumentation-key',
    },
    'unified-production': {
        release: true,
        config: {
            options: {
                ...commonUnifiedOptions,
                ...icons.production,
                fullName: 'Accessibility Insights for Android',
                telemetryBuildName: 'AI Android - Production',
            },
        },
        bundleFolder: 'electronBundle',
        mustExistFile: 'main.bundle.js',
        appId: 'com.microsoft.accessibilityinsights.unified.production',
        publishUrl: 'https://a11yinsightsandroidblob-production.blob.core.windows.net/aimobile-production',
        telemetryKeyIdentifier: 'unified-prod-instrumentation-key',
    },
};
