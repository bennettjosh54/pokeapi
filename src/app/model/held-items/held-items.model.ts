import {VersionDetails} from './version-details.model';

export class HeldItems {
    item: {
        name: string;
        url: string;
    };
    versionDetails: VersionDetails[];
}