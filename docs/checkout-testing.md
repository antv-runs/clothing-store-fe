# Checkout Testing Documentation

## 1. Validation (Zod schema)

- No implemented test file was found for `checkoutSchema` validation scenarios.

### fullName

- **Scenario:** empty → fail  
  **Input condition:** `fullName = ""`  
  **Expected result:** validation fails with required full name error  
  **Test status:** Not covered in current test files

- **Scenario:** too short → fail  
  **Input condition:** `fullName` length `< 2` after trim  
  **Expected result:** validation fails with short full name error  
  **Test status:** Not covered in current test files

- **Scenario:** valid → pass  
  **Input condition:** non-empty `fullName` with length `>= 2` and no digits  
  **Expected result:** validation passes for `fullName`  
  **Test status:** Not covered in current test files

### email

- **Scenario:** invalid format → fail  
  **Input condition:** non-empty string not matching email format  
  **Expected result:** validation fails with invalid email error  
  **Test status:** Not covered in current test files

- **Scenario:** valid → pass  
  **Input condition:** valid email format  
  **Expected result:** validation passes for `email`  
  **Test status:** Not covered in current test files

### address

- **Scenario:** empty → fail  
  **Input condition:** `address = ""`  
  **Expected result:** validation fails with required address error  
  **Test status:** Not covered in current test files

- **Scenario:** too short → fail  
  **Input condition:** `address` length `< 5` after trim  
  **Expected result:** validation fails with short address error  
  **Test status:** Not covered in current test files

- **Scenario:** valid → pass  
  **Input condition:** non-empty address with length `>= 5` containing valid characters  
  **Expected result:** validation passes for `address`  
  **Test status:** Not covered in current test files

## 2. UI behavior (React Testing Library)

- No implemented Checkout page component test file was found.

- **Scenario:** render form successfully  
  **Input condition:** render Checkout page component  
  **Expected result:** form and fields are visible  
  **Test status:** Not covered in current test files

- **Scenario:** display validation errors on submit  
  **Input condition:** submit with invalid or empty form values  
  **Expected result:** validation error messages are shown  
  **Test status:** Not covered in current test files

- **Scenario:** update inputs correctly  
  **Input condition:** type into full name, email, and address fields  
  **Expected result:** input values update to typed values  
  **Test status:** Not covered in current test files

- **Scenario:** clear errors when user types  
  **Input condition:** type into fields after an error state  
  **Expected result:** related validation errors clear  
  **Test status:** Not covered in current test files

## 3. Submit flow

- No implemented submit-flow test file was found for Checkout.

- **Scenario:** cart empty → prevent submit  
  **Input condition:** `readStoredCartRows()` returns `[]`  
  **Expected result:** submit exits early and `createOrder` is not called  
  **Test status:** Not covered in current test files

- **Scenario:** cart has items → call `createOrder`  
  **Input condition:** cart rows exist and form values are valid  
  **Expected result:** `createOrder` is called once  
  **Test status:** Not covered in current test files

- **Scenario:** correct payload mapping  
  **Input condition:** valid form values and cart rows with `productId` and `quantity`  
  **Expected result:** payload maps to `customer_name`, `customer_email`, `address`, and `items[{ product_id, quantity }]`  
  **Test status:** Not covered in current test files

- **Scenario:** success → clear cart + reset form  
  **Input condition:** `createOrder` resolves successfully  
  **Expected result:** `writeStoredCartRows([])` is called and form resets  
  **Test status:** Not covered in current test files

- **Scenario:** failure → do not clear cart  
  **Input condition:** `createOrder` rejects  
  **Expected result:** cart is not cleared  
  **Test status:** Not covered in current test files
