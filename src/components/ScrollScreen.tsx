import React, { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScrollScreenProps {
  children: ReactNode;
}

export function ScrollScreen({ children }: ScrollScreenProps) {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView 
        style={styles.ScrollView}
        contentContainerStyle={{
          paddingTop: insets.top + 15,
          paddingBottom: 70 + insets.bottom 
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
     </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    ScrollView: { flex: 1, backgroundColor: "white" }
})