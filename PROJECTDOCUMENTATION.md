# Garage Marketplace App - Project Documentation

## Why I Chose This Project
The Garage Marketplace App is designed to address a practical problem: utilizing unused garage spaces for storage. The concept is inspired by the sharing economy model, where people can monetize their unused space. This project focuses on building a platform where users can list their unused garage spaces and others can book them for short-term storage.

I chose this project because it involves core functionalities that are essential for building any modern marketplace app. It also covers key aspects such as:

- User authentication
- Data management
- Real-time interactions
- Integration with Supabase for backend
- Cross-platform mobile development with React Native and Expo

Additionally, this project allows for future expansion by adding features like location-based services, payments, and reviews.

## Stack & Tools Used

The following stack and tools were selected to build and scale the project:

### Frontend (React Native + Expo)

- **React Native**: The app is built using React Native for cross-platform mobile development (iOS and Android). React Native was chosen for its speed in development, flexibility, and reusable components.

- **Expo**: Expo was chosen for its ease of use and ability to build and run the app on both iOS and Android.

- **Redux**: Used to manage the app's state and provide a consistent way to access and update data across the app.

- **React Navigation**: Used to handle screen navigation and transitions, making the app's user interface flow seamless and intuitive.

- **Supabase Client**: Integrated Supabase for managing backend services such as authentication, database storage, and real-time capabilities.

### Backend (Supabase)

- **Supabase**: Used as the backend-as-a-service (BaaS) for handling user authentication, database operations, and real-time features.

- **Supabase Auth**: For user authentication, allowing users to sign up, log in, and manage their accounts.

- **Supabase Database**: For storing listing data, user profiles, and bookings.

- **Supabase Storage**: Used for storing listing photos in a secure and scalable way.

## Future Features to Complete the Project

### Google Places Autocomplete

- **Purpose**: Enhance the listing creation process by integrating Google Places API for address autocomplete.
- **Why**: This will simplify location entry for users and improve the accuracy of address data.
- **Implementation**: This will involve integrating the Google Places API with a search bar for addresses in the Create Listing screen.

### Map Integration

- **Purpose**: Display garage locations on a map to allow users to browse and book based on proximity.
- **Why**: Helps users visually see the available garages and choose the most convenient location.
- **Implementation**: Utilize React Native Maps to create an interactive map where listings are marked as pins. Each pin can show brief details (e.g., title, price) upon tapping.

### Payment Integration (Stripe)

- **Purpose**: Allow users to pay for bookings through Stripe integration.
- **Why**: Provides a secure and seamless payment experience for the users.
- **Implementation**: Integrate Stripe for payment processing on the Booking Confirmation screen. This will involve implementing a payment flow and storing the transaction details.

### Messaging System

- **Purpose**: Implement a chat system between guests and hosts for easy communication about listings, bookings, and more.
- **Why**: Adds a layer of convenience for users, allowing them to directly communicate within the app without needing third-party messaging tools.
- **Implementation**: Integrate a simple chat system (e.g., Supabase Realtime or a custom solution) to enable real-time messaging between users. A dedicated chat screen will be available once a booking is made.

## Scalability and Architecture Considerations

### UI/UX Polish

- Focus on providing a smooth and intuitive experience, especially in core screens such as:
  - Listing creation / Garage creation
  - Booking management
  - Profile management

### Push Notifications

- **Purpose**: Notify users about booking confirmations, payment receipts, and reminders.
- **Why**: Helps users stay engaged and informed, providing real-time updates.
- **Implementation**: Use React Native Push Notifications to send notifications when key events occur.

### Testing and Debugging

- Conduct extensive unit tests and UI tests to ensure that features work as expected on both platforms.
- Perform debugging and resolve any issues related to performance (e.g., slow loading times for images, large datasets).

### Optimize for Performance

- **Purpose**: Ensure that the app performs well even with large data sets (e.g., a lot of listings or bookings).
- **Why**: Poor performance can negatively affect user experience.
- **Implementation**: Optimize the app by implementing:
  - Lazy loading
  - Pagination for lists
  - Image compression for faster load times

### Current Status
- Core features like garage creation, user authentication, reviews & ratings, and booking management are functional
- Basic UI/UX is implemented and working across platforms

### Next Steps
- Implement payment processing
- Add Google Places integration
- Develop messaging system
- Expand testing coverage

By considering scaling strategies and incorporating future-proofing features, the project will be able to accommodate a growing user base while maintaining a seamless and user-friendly experience.
