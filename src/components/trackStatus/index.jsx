import {useEffect} from "react";
import {
  requestTrackingPermission,
  getTrackingStatus,
  TrackingStatus,
} from "react-native-tracking-transparency";

const TrackStatus = ({children}) => {
  useEffect(() => {
    checkTrackingStatus();
  }, []);

  const checkTrackingStatus = async () => {
    try {
      const trackingStatus = await getTrackingStatus();

      if (
        trackingStatus === TrackingStatus.Authorized ||
        trackingStatus === TrackingStatus.Unavailable
      ) {
        enableTrackingFeatures();
      } else {
        requestPermission();
      }
    } catch (error) {
      console.error("Error getting tracking status:", error);
    }
  };

  const requestPermission = async () => {
    try {
      const status = await requestTrackingPermission();
      handleTrackingStatus(status);
    } catch (error) {
      console.error("Error requesting tracking permission:", error);
    }
  };

  const handleTrackingStatus = status => {
    let message = "";
    switch (status) {
      case TrackingStatus.Authorized:
        message = "Authorized";
        enableTrackingFeatures();
        break;
      case TrackingStatus.Denied:
        message = "Denied";
        break;
      case TrackingStatus.NotDetermined:
        message = "Not Determined";
        break;
      case TrackingStatus.Restricted:
        message = "Restricted";
        break;
      default:
        message = "Unknown";
        break;
    }
    console.log(message);
  };

  const enableTrackingFeatures = () => {
    // Здесь включите функциональность отслеживания
    // например, активируйте определенные функции или модули
    // на основе статуса разрешения или доступности отслеживания
    console.log("Tracking features enabled");
  };

  return children;
};

export default TrackStatus;
