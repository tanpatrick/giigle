package giigle.backend.modules.gig.mapper

import giigle.backend.core.mapper.GenericMapper
import giigle.backend.modules.gig.entity.GigEntity
import giigle.generated.model.CreateGigRequest
import giigle.generated.model.Gig
import org.mapstruct.AfterMapping
import org.mapstruct.InheritInverseConfiguration
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget

@Mapper(
    componentModel = "spring",
)
abstract class GigMapper : GenericMapper<CreateGigRequest, Gig, GigEntity>() {
    @Mapping(target = "location.createdAt", ignore = true)
    @Mapping(target = "location.gig", ignore = true)
    @Mapping(target = "location.id", ignore = true)
    @Mapping(target = "location.modifiedAt", ignore = true)
    @Mapping(source = "location.coordinates.latitude", target = "location.latitude")
    @Mapping(source = "location.coordinates.longitude", target = "location.longitude")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "modifiedAt", ignore = true)
    abstract override fun createModelToEntity(model: CreateGigRequest): GigEntity

    @InheritInverseConfiguration(name = "modelToEntity")
    @Mapping(source = "id", target = "id")
    abstract override fun entityToModel(entity: GigEntity): Gig

    @Mapping(source = "location.coordinates.latitude", target = "location.latitude")
    @Mapping(source = "location.coordinates.longitude", target = "location.longitude")
    @Mapping(target = "location.createdAt", ignore = true)
    @Mapping(target = "location.gig", ignore = true)
    @Mapping(target = "location.id", ignore = true)
    @Mapping(target = "location.modifiedAt", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "modifiedAt", ignore = true)
    abstract override fun modelToEntity(model: Gig): GigEntity

    @AfterMapping
    fun addAdditionalInfo(
        @MappingTarget entity: GigEntity,
    ) {
        entity.location.gig = entity
    }
}
