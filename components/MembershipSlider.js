import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");
const height = width * 0.3; //60%

function MembershipSlider({ content, removeWidth }) {
  const [active, setActive] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [intervalTimerId, setIntervalTimerId] = useState(null);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (!isScrolling && content.length > 1) {
      let counter = 0;
      const interval = setInterval(() => {
        let x_width = counter == 1 ? -width : width;
        if (counter == 0) {
          counter++;
        } else {
          counter--;
        }
        scrollViewRef?.current?.scrollTo({
          x: x_width,
          animated: true,
        });
      }, 3000);
      setIntervalTimerId(interval);
    }

    return () => clearInterval(intervalTimerId);
  }, [scrollViewRef, isScrolling, content]);

  if (!content.length) return null;

  const handleChange = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    ).toFixed(5);
    setActive(+slide);
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleChange}
        onTouchStart={() => {
          clearInterval(intervalTimerId);
          setIsScrolling(true);
        }}
        onTouchEnd={() => setIsScrolling(false)}
        scrollEventThrottle={16}
        style={[{ width: width - (removeWidth ?? 80) }, styles.scroll]}
      >
        {content.map((item, index) => {
          return (
            <View
              key={item.id}
              style={[{ width: width - (removeWidth ?? 80) }, styles.content]}
            >
              <Text style={[styles.title, { color: item.titleColor }]}>
                {item.title}
              </Text>
              <Text style={styles.subTitle}>{item.subTitle}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={[styles.pagination]}>
        {content.length > 1 &&
          content.map((i, k) => (
            <View key={i.id}>
              {active === k ? (
                <Text style={styles.activeDot}>⬤⬤⬤⬤⬤⬤⬤⬤</Text>
              ) : (
                <Text style={styles.inActiveDot}>⬤</Text>
              )}
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width, height, alignItems: "center" },
  scroll: { height },
  image: {
    height,
    resizeMode: "cover",
  },
  content: {
    height,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    lineHeight: 36,
  },
  subTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#000",
  },
  pagination: {
    flexDirection: "row",
  },
  activeDot: {
    color: "#0F0516",
    letterSpacing: -5,
    fontSize: 6,
  },
  inActiveDot: {
    color: "#D8D8D8",
    marginHorizontal: 10,
    fontSize: 6,
  },
});
export default MembershipSlider;
