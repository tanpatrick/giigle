package giigle.backend.modules.gig.mapper

import giigle.backend.modules.gig.entity.GigEntity
import giigle.generated.model.CreateGigRequest
import giigle.generated.model.Gig
import org.mapstruct.InheritInverseConfiguration
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(
    componentModel = "spring",
)
interface GigMapper {
    @Mapping(source = "location.latitude", target = "location.coordinates.latitude")
    @Mapping(source = "location.longitude", target = "location.coordinates.longitude")
    fun toGig(entity: GigEntity): Gig

    @Mapping(target = "location.createdAt", ignore = true)
    @Mapping(target = "location.gig", ignore = true)
    @Mapping(target = "location.id", ignore = true)
    @Mapping(target = "location.modifiedAt", ignore = true)
    @Mapping(source = "location.coordinates.latitude", target = "location.latitude")
    @Mapping(source = "location.coordinates.longitude", target = "location.longitude")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "modifiedAt", ignore = true)
    fun toEntity(request: CreateGigRequest): GigEntity

    @InheritInverseConfiguration(name = "toGig")
    @Mapping(target = "location.createdAt", ignore = true)
    @Mapping(target = "location.gig", ignore = true)
    @Mapping(target = "location.id", ignore = true)
    @Mapping(target = "location.modifiedAt", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "modifiedAt", ignore = true)
    fun fromGig(gig: Gig): GigEntity
}
