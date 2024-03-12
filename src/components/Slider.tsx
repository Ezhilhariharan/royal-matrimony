import { StyleSheet, Animated, View, FlatList, Image, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { IMAGES } from "../assets/Images"
import color from '../configurations/config/color.config'

interface carousel {
    id: any,
    img: string
}

const Carousel: carousel[] = [
    {
        id: 1,
        img: IMAGES.carouselImage1,
    },
    {
        id: 2,
        img: IMAGES.carouselImage2,
    },
    {
        id: 3,
        img: IMAGES.carouselImage3,
    },
];

// const deviceWidth: any = Dimensions.get("window").height

const Slider = () => {

    const flatListRef = useRef<any>()
    const index = useRef<any>(0)
    const [currentIndex, setcurrentIndex] = useState(0);

    let enable = true, width = Dimensions.get("window").width, count = 3, duration = 2000
    useEffect(() => {
        if (enable && width && count) {
            setInterval(autoScrollTo, duration)
        }
    }, [])

    const autoScrollTo = () => {
        const newIndex = index.current
        if (newIndex < count) {
            flatListRef?.current?.scrollToOffset({ animated: true, offset: width * newIndex })
            index.current = newIndex + 1
        } else {
            index.current = 0
        }
    }

    const renderItem = ({ item }: any) => {
        return (
            <Image source={item.img} style={styles.itemImage} />
        );
    }
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const totalWidth = event.nativeEvent.layoutMeasurement.width
        const offset = event.nativeEvent.contentOffset.x
        const current = Math.floor(offset / totalWidth)
        setcurrentIndex(current)
    }

    return (
        <View style={styles.carouselContainer}>

            <View style={styles.upperLayer}>
                <View style={styles.flatlist}>
                    <FlatList
                        ref={flatListRef}
                        data={Carousel}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        bounces={false}
                        // onScroll={Animated.event(
                        //     [{ nativeEvent: { contentOffset: { x: scrollViewAnimationRef } } }],
                        //     { useNativeDriver: false }
                        // )}
                        onScroll={onScroll}
                    />
                </View>
            </View>

            <View style={styles.gradientContainer}>
                <View style={styles.dotContainer}>
                    {Carousel?.map((e, i) => (
                        <View key={i} style={[styles.dot, currentIndex == i ? styles.dotActive : {}]} />
                    ))}
                </View>
            </View>


            {/* <View style={styles.gradientContainer}>
                <View style={styles.dotContainer}>

                    {Carousel?.map((e, i) => {
                        if (!scrollViewAnimationRef) return null
                        const pastPosition = i - 1, currentPosition = i, nextPosition = i + 1
                        const width = scrollViewAnimationRef.interpolate({
                            inputRange: [pastPosition * deviceWidth, currentPosition * deviceWidth, nextPosition * deviceWidth],
                            outputRange: [6, 20, 6],
                            extrapolate: 'clamp'
                        });
                        const backgroundColor = scrollViewAnimationRef.interpolate({
                            inputRange: [pastPosition * deviceWidth, currentPosition * deviceWidth, nextPosition * deviceWidth],
                            outputRange: ["#D9D9D9", "#ED1F50", "#D9D9D9"],
                            extrapolate: 'clamp'
                        });
                        return <Animated.View style={[styles.dot, { backgroundColor, width, }]} key={i} />
                    })}
                </View>
            </View> */}
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    carouselContainer: {
        width: Dimensions.get("window").width,
        height: 500,
        backgroundColor: color.PRIMARY_COLOR,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    itemImage: {
        width: Dimensions.get("window").width,
        justifyContent: 'center',
        height: 600,
        resizeMode: 'cover',
    },
    flatlist: {
        width: Dimensions.get("window").width,
    },
    upperLayer: {
        position: "absolute",
        top: -150,
        alignSelf: 'center',
        alignItems: 'center',
        overflow: "hidden",
        width: Dimensions.get("window").width + 180,
        height: 600,
        backgroundColor: color.TRANSPARENT,
        borderWidth: 10,
        borderLeftColor: color.SECONDARY_COLOR,
        borderRightColor: color.SECONDARY_COLOR,
        borderBottomColor: color.SECONDARY_COLOR,
        borderRadius: 600 / 2,
    },
    gradientContainer: {
        width: '100%',
        height: 'auto',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.TRANSPARENT,
    },
    dotContainer: {
        flexDirection: 'row',
        marginVertical: 16,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        height: 6,
        width: 6,
        marginHorizontal: 6,
        borderRadius: 100,
        backgroundColor: "#D9D9D9"
    },
    dotActive: {
        height: 6,
        width: 20,
        marginHorizontal: 4,
        borderRadius: 100,
        backgroundColor: color.SECONDARY_COLOR
    }
})