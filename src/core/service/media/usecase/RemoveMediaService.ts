import { MediaRepositoryPort } from '../../../domain/media/port/persistence/MediaRepositoryPort';
import { Media } from '../../../domain/media/entity/Media';
import { Optional } from '../../../shared/type/CommonTypes';
import { Exception } from '../../../shared/exception/Exception';
import { Code } from '../../../shared/code/Code';
import { RemoveMediaUseCase } from '../../../domain/media/usecase/RemoveMediaUseCase';
import { RemoveMediaPort } from '../../../domain/media/port/usecase/RemoveMediaPort';

export class RemoveMediaService implements RemoveMediaUseCase {
  
  constructor(
    private readonly mediaRepository: MediaRepositoryPort,
  ) {}
  
  public async execute(payload: RemoveMediaPort): Promise<void> {
    const media: Optional<Media> = await this.mediaRepository.findMedia({id: payload.mediaId});
    if (!media) {
      throw Exception.new({code: Code.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Media not found.'});
    }
    
    await this.mediaRepository.removeMedia(media);
  }
  
}