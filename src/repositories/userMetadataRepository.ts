import UserMetadata, { IUserMetadata } from '../models/userMetadataModel';

export function addUserMetadata(metadata: IUserMetadata) {
  return UserMetadata.create(metadata);
}
