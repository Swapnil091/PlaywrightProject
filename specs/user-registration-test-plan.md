# User Registration (@userReg) Test Plan

## Application Overview

QA plan for the user-registration scenario in features/support/userRegistration.feature. The browser session was about:blank and no registration application URL or shared page was available, so route, field labels, and success message remain assumptions to verify against the running application.

## Test Scenarios

### 1. User Registration

**Seed:** `seed.spec.ts`

#### 1.1. Submit valid user registration details

**File:** `features/support/userRegistration.feature`

**Steps:**
  1. Open the configured application and navigate to the user registration page.
    - expect: The registration form is visible and ready for input.
  2. Enter name Swapnil, email swapnil@gmail.com, phone 9090909090, and Pune in each of the two remaining location fields.
    - expect: Each value appears in its corresponding registration field.
    - expect: No validation errors are shown for these valid values.
  3. Activate the Submit button once.
    - expect: The form submits successfully.
    - expect: A confirmation indicates the user was added or registered.
    - expect: The new user is visible in the resulting list or confirmation view.

#### 1.2. Reject an invalid email address

**File:** `features/support/userRegistration.feature`

**Steps:**
  1. Open a fresh user registration form.
    - expect: The form is empty and ready for input.
  2. Enter otherwise valid user details, but use an invalid email such as not-an-email.
    - expect: The entered values remain available for correction.
  3. Activate the Submit button.
    - expect: The form does not create a user.
    - expect: An email validation message is displayed or submission is blocked by browser validation.

#### 1.3. Require mandatory registration fields

**File:** `features/support/userRegistration.feature`

**Steps:**
  1. Open a fresh user registration form and leave one required field empty while completing the others with valid values.
    - expect: The empty required field is identifiable.
  2. Activate the Submit button.
    - expect: The form does not create a user.
    - expect: A required-field validation message is shown or submission is blocked.

#### 1.4. Prevent duplicate registration

**File:** `features/support/userRegistration.feature`

**Steps:**
  1. Register a user using a unique email address and confirm success.
    - expect: The first registration succeeds.
  2. Open a fresh registration form and submit the same email address again with otherwise valid details.
    - expect: The duplicate registration is rejected with a clear message.
    - expect: No second account is created for the same email address.
