package giigle.backend.modules.poster.mapper

import giigle.backend.core.mapper.GenericMapper
import giigle.backend.modules.poster.entity.PosterEntity
import giigle.generated.model.CreatePosterRequest
import giigle.generated.model.Poster
import org.mapstruct.InheritInverseConfiguration
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(
    componentModel = "spring",
)
abstract class PosterMapper : GenericMapper<CreatePosterRequest, Poster, PosterEntity>() {
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "modifiedAt", ignore = true)
    @Mapping(target = "type", expression = "java(PosterType.PERSON)")
    abstract override fun createModelToEntity(model: CreatePosterRequest): PosterEntity

    @InheritInverseConfiguration(name = "modelToEntity")
    @Mapping(source = "id", target = "id")
    abstract override fun entityToModel(entity: PosterEntity): Poster

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "modifiedAt", ignore = true)
    @Mapping(target = "type", expression = "java(PosterType.PERSON)")
    abstract override fun modelToEntity(model: Poster): PosterEntity
}
