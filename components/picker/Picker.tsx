import React, {useEffect, useRef, useState} from 'react';
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Animated, {useSharedValue, withTiming} from "react-native-reanimated";
import {Colors} from "../../constants/Colors";

const Picker = ({ value, setValue, itemHeight=50, items }: {
    value: string,
    setValue: (val: string) => void,
    itemHeight?: number
    items: Array<string>
}) => {

    const isWeb = Platform.OS === "web"
    const itemWidth = 50

    const [currentItem, setCurrentItem] = useState<string>(value)
    const itemsListRef = useRef<any|null>(null)
    const [listMargin, setListMargin] = useState(0)
    const scrollingHandler = useRef<ReturnType<typeof setTimeout>>()
    const visibleItemsCount = 7


    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!isWeb) e.persist()
        onScrollEnd(() => matchItemFromScroll(e.nativeEvent.contentOffset.y))
    }

    const onScrollEnd = (callback: Function) => {
        if (scrollingHandler.current) clearTimeout(scrollingHandler.current)
        scrollingHandler.current = setTimeout(() => callback(), 200)
    }

    const matchItemFromScroll = (pos: number) => {
        change(Math.round(pos/itemHeight))
    }

    const change = (newIndex: number) => {
        setCurrentItem((prev) => prev = items[newIndex])
        flyTo(newIndex)
        update(items[newIndex])
    }

    const flyTo = (index:number) => {
        itemsListRef.current?.scrollToOffset({
            offset: index * itemHeight,
            animated: true,
        })
    }

    const update = (newVal:string) => {
        setValue(newVal)
    }

    useEffect(() => {
        const initialIndex = items.findIndex(item => item === value)
        change(initialIndex === -1? 0 : initialIndex)
    }, [items])


    const styles = StyleSheet.create({
        container: {
            height: itemHeight * visibleItemsCount,
            width: itemWidth,
            alignSelf: "center",
            position: "relative",
            display: "flex",
            justifyContent: 'center',
            marginVertical: 20,
        },
        scrollContainer: {
            paddingVertical: listMargin,
            flexGrow: 1,
            alignSelf: "flex-end",
            position: "absolute",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
        },
        item: {
            width: itemWidth,
            height: itemHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            textAlign: "center",
            fontSize: 18,
            color: Colors.darkGrey,
            fontWeight: "600",
        },
        selected: {
            fontSize: 22,
            color: Colors.black
        }
    })

    return (
        <View style={styles.container}>
            <FlatList
                ref={itemsListRef}
                data={items}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                initialNumToRender={7}
                onScroll={onScroll}
                onLayout={e => {
                    if (!isWeb) e.persist()
                    setListMargin((e.nativeEvent.layout.height - itemHeight) / 2)
                }}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity
                            style={styles.item}
                            onPressIn={() => {
                                if (isWeb) change(index)
                                else onScrollEnd(() => change(index))
                            }}
                        >
                            <Text
                                style={item === currentItem ? {...styles.text, ...styles.selected} : styles.text}
                            >{ item }</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

export default Picker;