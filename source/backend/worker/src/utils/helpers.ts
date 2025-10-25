// Explicitly define all possible Firestore value types for robustness
type FirestoreValue = {
  stringValue?: string;
  booleanValue?: boolean;
  doubleValue?: number;
  integerValue?: string;
  timestampValue?: string;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields: { [key: string]: FirestoreValue } };
  nullValue?: null;
};

// Explicitly define the Firestore document object structure
type FirestoreDocument<T> = {
  fields: {
    [key: string]: FirestoreValue;
  };
};

// A central parser that handles all Firestore types
export function parseFirestoreValue(value: FirestoreValue): any {
  if (!value) return null;

  if (typeof value.stringValue !== 'undefined') return value.stringValue;
  if (typeof value.booleanValue !== 'undefined') return value.booleanValue;
  if (typeof value.doubleValue !== 'undefined') return value.doubleValue;
  if (typeof value.integerValue !== 'undefined') return Number(value.integerValue);
  if (typeof value.timestampValue !== 'undefined') {
    return new Date(value.timestampValue);
  }
  if (typeof value.nullValue !== 'undefined') return null;

  if (value.arrayValue?.values !== undefined) {
    return value.arrayValue.values.map(parseFirestoreValue);
  }

  // THIS IS THE CORRECTED PART
  if (value.mapValue?.fields !== undefined) {
    return parseFirestoreDocument({ fields: value.mapValue.fields });
  }

  return null;
}

// The main function to parse an entire Firestore document
export function parseFirestoreDocument<T>(document: FirestoreDocument<T>): T {
  const result: any = {};
  if (!document || !document.fields) return {} as T;

  for (const key in document.fields) {
    if (Object.prototype.hasOwnProperty.call(document.fields, key)) {
      result[key] = parseFirestoreValue(document.fields[key]);
    }
  }

  return result as T;
}