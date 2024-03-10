declare global {
    interface Window {
        // electronAPI: {
        //     send: (channel: string, data: any) => void;
        //     receive: (channel: string, func: (...args: any[]) => void) => void;
        // };

        electron: {
            onboardingApi: {
                saveLibrary: (data: any) => void;
                saveNetwork: (data: any) => void;
                saveHistory: (data: any) => void;
            };
            send: (channel: string, data: any) => void;
            receive: (channel: string, func: (...args: any[]) => void) => void;
        };
    }
}

export {};
