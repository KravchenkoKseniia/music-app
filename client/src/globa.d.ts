declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.gif' {
    const content: any;
    export default content;
}