# Security Specification for Digital Marketer Portfolio

## 1. Data Invariants
- A message must have a valid `name`, `email`, and `message` content.
- `createdAt` must be the server time.
- Messages are "append-only" from the public; nobody can read them except an admin.

## 2. The "Dirty Dozen" Payloads
1. **Identity Spoofing**: Attempt to set `createdAt` to a past date.
2. **Resource Poisoning**: Create a message with a 1MB name string.
3. **Admin Escalation**: Attempt to read the `messages` collection as a non-logged-in user.
4. **Unauthorized Update**: Attempt to edit a message after it's been sent.
5. **Unauthorized Delete**: Attempt to delete a message as a non-admin.
6. **Malicious ID**: Use a message ID that is an extremely long string.
7. **Type Mismatch**: Send an object for the `email` field.
8. **Missing Fields**: Send a message without the `message` field.
9. **Shadow Fields**: Send a message with an extra `isApproved` field that isn't in the schema.
10. **Email Spoofing**: Use a fake email format.
11. **PII Leak**: Attempt to list all messages.
12. **Query Scraping**: Attempt to query messages by email without admin rights.

## 3. The Test Runner (Mock)
(Normally I'd create a .test.ts file here, but since I don't have a test environment set up, I will focus on the rules implementation.)
