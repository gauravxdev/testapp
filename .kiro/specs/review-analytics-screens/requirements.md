# Requirements Document

## Introduction

This document defines the requirements for implementing a horizontal carousel containing three analytics and visualization screens within the Review section of a React Native Expo application. When a user clicks a "View Details" button on the main reviews screen, a carousel opens displaying three swipeable screens: Sentiment Distribution, Five-Metric Scorecard, and Resolution Lens. These screens provide sentiment analysis, company performance metrics, and review resolution status visualizations to help users understand review data through interactive charts and scorecards.

## Glossary

- **Analytics_Carousel**: A horizontal slider component that contains the three analytics screens and supports swipe gestures
- **View_Details_Button**: A button on the main reviews screen that triggers the Analytics_Carousel to open
- **Sentiment_Distribution_Screen**: The first screen in the carousel showing sentiment analysis with donut chart and theme breakdowns
- **Five_Metric_Scorecard_Screen**: The second screen in the carousel displaying five company rating metrics with horizontal bar visualizations
- **Resolution_Lens_Screen**: The third screen in the carousel showing review resolution status percentages
- **Pagination_Indicator**: Visual dots at the bottom of the carousel showing which screen is currently active
- **Swipe_Gesture**: A horizontal touch gesture that allows users to navigate between carousel screens
- **Donut_Chart**: A circular chart visualization showing proportional distribution
- **Horizontal_Bar**: A bar chart visualization oriented horizontally showing metric scores
- **Theme_Tag**: A categorical label (Finance, Energy, Banking) associated with sentiment
- **Header_Component**: The top navigation bar with title and user profile icon
- **Search_Bar**: The input field for searching with filter and sort dropdowns
- **Bottom_Navigation**: The tab bar with Review, Rating, Roadshows, Representation, Learn tabs

## Requirements

### Requirement 1: View Details Button

**User Story:** As a user, I want to click a "View Details" button on the reviews screen, so that I can access detailed analytics visualizations.

#### Acceptance Criteria

1. THE reviews.tsx screen SHALL display a View_Details_Button for each product card
2. WHEN a user taps the View_Details_Button, THE Analytics_Carousel SHALL open
3. THE View_Details_Button SHALL be clearly labeled and visually distinct from other action buttons
4. THE View_Details_Button SHALL be accessible on both the carousel cards and the "All Products" list items

### Requirement 2: Analytics Carousel Component

**User Story:** As a user, I want to swipe through analytics screens horizontally, so that I can view different visualizations for a product.

#### Acceptance Criteria

1. THE Analytics_Carousel SHALL contain exactly three screens in fixed order: Sentiment_Distribution_Screen, Five_Metric_Scorecard_Screen, Resolution_Lens_Screen
2. THE Analytics_Carousel SHALL display the Sentiment_Distribution_Screen as the first screen when opened
3. WHEN a user performs a Swipe_Gesture to the left, THE Analytics_Carousel SHALL transition to the next screen
4. WHEN a user performs a Swipe_Gesture to the right, THE Analytics_Carousel SHALL transition to the previous screen
5. THE Analytics_Carousel SHALL prevent swiping left when on the Resolution_Lens_Screen (last screen)
6. THE Analytics_Carousel SHALL prevent swiping right when on the Sentiment_Distribution_Screen (first screen)
7. THE Analytics_Carousel SHALL animate transitions smoothly between screens
8. THE Analytics_Carousel SHALL support a back navigation action to return to the main reviews screen

### Requirement 3: Pagination Indicators

**User Story:** As a user, I want to see which analytics screen I'm currently viewing, so that I know my position within the carousel.

#### Acceptance Criteria

1. THE Analytics_Carousel SHALL display Pagination_Indicator dots at the bottom of each screen
2. THE Pagination_Indicator SHALL display exactly three dots representing the three screens
3. THE Pagination_Indicator SHALL highlight the dot corresponding to the currently active screen
4. WHEN the user navigates to a different screen, THE Pagination_Indicator SHALL update to highlight the new active screen
5. THE Pagination_Indicator SHALL use circular dots with consistent spacing
6. THE Pagination_Indicator SHALL use distinct visual styling for active versus inactive dots

### Requirement 4: Sentiment Distribution Screen

**User Story:** As a user, I want to view sentiment analysis of reviews, so that I can understand the overall sentiment distribution and identify key themes.

#### Acceptance Criteria

1. THE Sentiment_Distribution_Screen SHALL display a donut chart showing positive, neutral, and negative sentiment percentages
2. THE Sentiment_Distribution_Screen SHALL display a "Top Positive Themes" section with Finance, Energy, and Banking tags
3. THE Sentiment_Distribution_Screen SHALL display a "Top Neutral Themes" section with theme tags
4. THE Sentiment_Distribution_Screen SHALL display a "Top Negative Themes" section with Finance, Energy, and Banking tags
5. THE Sentiment_Distribution_Screen SHALL include the Header_Component with "Review" title and user profile icon
6. THE Sentiment_Distribution_Screen SHALL include the Search_Bar with "Filters" and "Top Rated" dropdowns
7. THE Sentiment_Distribution_Screen SHALL include the Bottom_Navigation with all five tabs
8. THE Sentiment_Distribution_Screen SHALL display the Pagination_Indicator showing it is the first screen

### Requirement 5: Five-Metric Scorecard Screen

**User Story:** As a user, I want to view company ratings across five key metrics, so that I can assess company performance in specific areas.

#### Acceptance Criteria

1. THE Five_Metric_Scorecard_Screen SHALL display a Transparency metric with a rating score and Horizontal_Bar visualization
2. THE Five_Metric_Scorecard_Screen SHALL display a Responsiveness metric with a rating score and Horizontal_Bar visualization
3. THE Five_Metric_Scorecard_Screen SHALL display an Ease of Process metric with a rating score and Horizontal_Bar visualization
4. THE Five_Metric_Scorecard_Screen SHALL display a Trustworthiness metric with a rating score and Horizontal_Bar visualization
5. THE Five_Metric_Scorecard_Screen SHALL display an Overall Satisfaction metric with a rating score and Horizontal_Bar visualization
6. WHEN displaying metric scores, THE Five_Metric_Scorecard_Screen SHALL format ratings to one decimal place
7. THE Five_Metric_Scorecard_Screen SHALL include the Header_Component with "Review" title and user profile icon
8. THE Five_Metric_Scorecard_Screen SHALL include the Search_Bar with "Filters" and "Top Rated" dropdowns
9. THE Five_Metric_Scorecard_Screen SHALL include the Bottom_Navigation with all five tabs
10. THE Five_Metric_Scorecard_Screen SHALL display the Pagination_Indicator showing it is the second screen

### Requirement 6: Resolution Lens Screen

**User Story:** As a user, I want to view review resolution status, so that I can understand how many reviews have been resolved, are in progress, or remain unresolved.

#### Acceptance Criteria

1. THE Resolution_Lens_Screen SHALL display the percentage of resolved reviews
2. THE Resolution_Lens_Screen SHALL display the percentage of in-progress reviews
3. THE Resolution_Lens_Screen SHALL display the percentage of unresolved reviews
4. THE Resolution_Lens_Screen SHALL display a note stating "Resolution status updated only by reviewer. Companies cannot edit reviews"
5. THE Resolution_Lens_Screen SHALL include the Header_Component with "Review" title and user profile icon
6. THE Resolution_Lens_Screen SHALL include the Search_Bar with "Filters" and "Top Rated" dropdowns
7. THE Resolution_Lens_Screen SHALL include the Bottom_Navigation with all five tabs
8. THE Resolution_Lens_Screen SHALL display the Pagination_Indicator showing it is the third screen

### Requirement 7: Shared Component Consistency

**User Story:** As a developer, I want shared components across all analytics screens, so that the user experience is consistent.

#### Acceptance Criteria

1. THE Header_Component SHALL display "Review" as the title text across all screens in the Analytics_Carousel
2. THE Header_Component SHALL display a user profile icon in the top-right corner across all screens in the Analytics_Carousel
3. THE Search_Bar SHALL include a search input field across all screens in the Analytics_Carousel
4. THE Search_Bar SHALL include a "Filters" dropdown button across all screens in the Analytics_Carousel
5. THE Search_Bar SHALL include a "Top Rated" dropdown button across all screens in the Analytics_Carousel
6. THE Bottom_Navigation SHALL display Review, Rating, Roadshows, Representation, and Learn tabs in order
7. THE Bottom_Navigation SHALL highlight the Review tab when the Analytics_Carousel is active
8. THE Pagination_Indicator SHALL be consistently positioned at the bottom of the content area across all three screens

### Requirement 8: Visual Design Consistency

**User Story:** As a user, I want the analytics screens to match the existing app design, so that the interface feels cohesive.

#### Acceptance Criteria

1. THE Analytics_Carousel SHALL use the color scheme from the existing application
2. THE Analytics_Carousel SHALL use the typography styles from the existing application
3. THE Analytics_Carousel SHALL use the spacing and layout patterns from the existing application
4. THE Analytics_Carousel SHALL be responsive to different screen sizes
5. THE Analytics_Carousel SHALL support safe area insets for notched devices
6. THE Analytics_Carousel SHALL maintain consistent transition animations with the existing carousel on the reviews screen

### Requirement 9: Data Visualization Requirements

**User Story:** As a user, I want clear and accurate data visualizations, so that I can quickly understand the metrics.

#### Acceptance Criteria

1. THE Donut_Chart SHALL display segment colors that distinguish positive, neutral, and negative sentiments
2. THE Donut_Chart SHALL display percentage labels for each segment
3. THE Horizontal_Bar SHALL display a filled portion representing the metric score out of a maximum value
4. THE Horizontal_Bar SHALL use a consistent color scheme across all five metrics
5. WHEN displaying theme tags, THE Analytics_Carousel SHALL use consistent tag styling with the main reviews screen
6. THE Analytics_Carousel SHALL display all percentages as whole numbers with a percent symbol

### Requirement 10: Gesture and Interaction Requirements

**User Story:** As a user, I want intuitive touch interactions, so that I can easily navigate the analytics carousel.

#### Acceptance Criteria

1. WHEN a user performs a Swipe_Gesture, THE Analytics_Carousel SHALL recognize horizontal swipe direction
2. THE Analytics_Carousel SHALL require a minimum swipe distance threshold to trigger screen transition
3. WHEN a swipe does not meet the threshold, THE Analytics_Carousel SHALL animate back to the current screen
4. THE Analytics_Carousel SHALL support both fast swipe gestures and slow drag gestures
5. THE Analytics_Carousel SHALL provide visual feedback during swipe gestures by partially revealing the adjacent screen
6. THE Analytics_Carousel SHALL complete screen transitions within 300 milliseconds
