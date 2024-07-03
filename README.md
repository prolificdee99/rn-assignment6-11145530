# rn-assignment6-11145530

# myShopping App

## Introduction

This project is a simple shopping application developed with React Native. It enables users to explore a selection of products, add them to a shopping cart, and review the cart's contents. The app features a modern and clean user interface.

## Design Choices

### User Interface

1. **Header and Subheader**: The header includes icons for the menu, logo, search, and cart. The subheader presents a title and icons for list view and filter options.
2. **Product Grid**: Products are displayed in a two-column grid layout using a FlatList. Each product card showcases an image, category, name, price, and an add-to-cart button.
3. **Cart View**: The cart view lists added products with their images, categories, names, prices, and a remove-from-cart button. It also displays the estimated total cost and includes a checkout button.
4. **Styling**: Consistent use of padding, margin, and font sizes for a cohesive look. Shadows and border radii are used to create depth.

### Data Storage

To maintain cart data across app sessions, AsyncStorage is utilized for data persistence. The useEffect hook is employed to load the cart data when the app initializes.

## Adding and Removing Items from Cart

Add to Cart: When a product is added to the cart, it is added to the cart state and saved in AsyncStorage.

Remove from Cart: When a product is removed from the cart, it is filtered out from the cart state and the updated cart is saved in AsyncStorage.

### Screenshots

![Screen 1](/myshoppingapp/screenshot1.jpg)

![Screen 2](/myshoppingapp/screenshot2.jpg)

### How to Run the App

Clone the repository.
Install the dependencies using npm install or yarn install.
Run the app on an emulator or a physical device using npx react-native run-android or npx react-native run-ios.

### Conclusion

This app provides a basic shopping experience with a focus on a clean user interface and persistent cart data. Further enhancements could include additional product details, user authentication, and more advanced filtering and sorting options.
