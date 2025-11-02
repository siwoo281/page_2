// Allow imports that include package@version (temporary shim for merged projects)
declare module '*@*';

// figma plugin assets
declare module 'figma:asset/*';

// common static asset types
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';

// Fallback for any unknown module
declare module '*';
