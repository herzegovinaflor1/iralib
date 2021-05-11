import {safeLoad} from 'js-yaml'
import {readFileSync} from 'fs';
import {QUERY_NAME_TO_QUERY} from '../types/context/queries';

export default function Persistent(filePath?: string) {
    return (constructor: Function) => {
        if (filePath) {
            try {
                const doc = safeLoad(readFileSync(filePath, 'utf8'));
                Object.entries(doc as any).forEach(([key, value]) => {
                    QUERY_NAME_TO_QUERY[key] = value as string;
                });
            } catch (e) {
                throw e
            }
        }
    }
}
