// types/firebase.d.ts (확장된 버전)
declare global {
  interface Window {
    firebase: {
      initializeApp: (config: any, name?: string) => any;
      firestore: {
        (): any;
        FieldValue: {
          serverTimestamp(): any;
        };
      };
    };
    db: any;
  }
}

export {}
