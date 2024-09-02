interface Logger {
    info: (message: string, meta?: any) => void;
    error: (message: string, meta?: any) => void;
}

const logger: Logger = {
    info: (message, meta) => {
        console.log('INFO:', message, meta);
    },
    error: (message, meta) => {
        console.error('ERROR:', message, meta);
    },
};

export default logger;
