import { IUserMetadata } from './../models/userMetadataModel';
import { userMetadataRepository } from '../repositories';

export function addUserMetadata(metadata: IUserMetadata) {
  return userMetadataRepository.addUserMetadata(metadata);
}
