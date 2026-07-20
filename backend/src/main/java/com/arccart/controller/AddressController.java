package com.arccart.controller;

import com.arccart.dto.AddressDto;
import com.arccart.dto.ApiResponse;
import com.arccart.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AddressController {

    private final AddressService addressService;
    private final Long currentUserId = 1L; // Hardcoded until Auth implementation

    @PostMapping
    public ResponseEntity<ApiResponse<AddressDto>> createAddress(@Valid @RequestBody AddressDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Address added successfully", addressService.createAddress(currentUserId, dto)), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AddressDto>>> getUserAddresses() {
        return ResponseEntity.ok(ApiResponse.success("Success", addressService.getUserAddresses(currentUserId)));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AddressDto>> getAddressById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Success", addressService.getAddressById(currentUserId, id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AddressDto>> updateAddress(@PathVariable Long id, @Valid @RequestBody AddressDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Address updated", addressService.updateAddress(currentUserId, id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(currentUserId, id);
        return ResponseEntity.ok(ApiResponse.success("Address deleted", null));
    }
    
    @PutMapping("/{id}/default")
    public ResponseEntity<ApiResponse<Void>> setDefaultAddress(@PathVariable Long id) {
        addressService.setDefaultAddress(currentUserId, id);
        return ResponseEntity.ok(ApiResponse.success("Default address updated", null));
    }
}
