package com.arccart.service;

import com.arccart.dto.AddressDto;
import com.arccart.entity.Address;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    @Transactional
    public AddressDto createAddress(Long userId, AddressDto dto) {
        if (Boolean.TRUE.equals(dto.getIsDefault())) {
            resetDefaultAddress(userId);
        }

        Address address = new Address();
        address.setUserId(userId);
        mapDtoToEntity(dto, address);
        
        address = addressRepository.save(address);
        return mapEntityToDto(address);
    }

    public List<AddressDto> getUserAddresses(Long userId) {
        return addressRepository.findByUserIdAndIsDeletedFalse(userId).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }
    
    public AddressDto getAddressById(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserIdAndIsDeletedFalse(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        return mapEntityToDto(address);
    }

    @Transactional
    public AddressDto updateAddress(Long userId, Long addressId, AddressDto dto) {
        Address address = addressRepository.findByIdAndUserIdAndIsDeletedFalse(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        if (Boolean.TRUE.equals(dto.getIsDefault()) && !Boolean.TRUE.equals(address.getIsDefault())) {
            resetDefaultAddress(userId);
        }

        mapDtoToEntity(dto, address);
        address = addressRepository.save(address);
        return mapEntityToDto(address);
    }

    @Transactional
    public void deleteAddress(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserIdAndIsDeletedFalse(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        address.setIsDeleted(true);
        addressRepository.save(address);
    }

    @Transactional
    public void setDefaultAddress(Long userId, Long addressId) {
        resetDefaultAddress(userId);
        Address address = addressRepository.findByIdAndUserIdAndIsDeletedFalse(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        address.setIsDefault(true);
        addressRepository.save(address);
    }

    private void resetDefaultAddress(Long userId) {
        addressRepository.findByUserIdAndIsDefaultTrueAndIsDeletedFalse(userId)
                .ifPresent(addr -> {
                    addr.setIsDefault(false);
                    addressRepository.save(addr);
                });
    }

    private void mapDtoToEntity(AddressDto dto, Address entity) {
        entity.setFullName(dto.getFullName());
        entity.setPhone(dto.getPhone());
        entity.setStreetAddress(dto.getStreetAddress());
        entity.setLandmark(dto.getLandmark());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setPincode(dto.getPincode());
        entity.setAddressType(dto.getAddressType() != null ? dto.getAddressType().toUpperCase() : "HOME");
        if(dto.getIsDefault() != null) entity.setIsDefault(dto.getIsDefault());
    }

    private AddressDto mapEntityToDto(Address entity) {
        AddressDto dto = new AddressDto();
        dto.setId(entity.getId());
        dto.setFullName(entity.getFullName());
        dto.setPhone(entity.getPhone());
        dto.setStreetAddress(entity.getStreetAddress());
        dto.setLandmark(entity.getLandmark());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setPincode(entity.getPincode());
        dto.setAddressType(entity.getAddressType());
        dto.setIsDefault(entity.getIsDefault());
        return dto;
    }
}
