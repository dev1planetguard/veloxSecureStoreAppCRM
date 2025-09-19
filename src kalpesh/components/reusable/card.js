import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Card = React.forwardRef(({ style, children, ...props }, ref) => (
  <View ref={ref} style={[styles.card, style]} {...props}>
    {children}
  </View>
))
Card.displayName = 'Card'

export const CardHeader = React.forwardRef(({ style, children, ...props }, ref) => (
  <View ref={ref} style={[styles.header, style]} {...props}>
    {children}
  </View>
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef(({ style, children, ...props }, ref) => (
  <Text ref={ref} style={[styles.title, style]} {...props}>
    {children}
  </Text>
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef(({ style, children, ...props }, ref) => (
  <Text ref={ref} style={[styles.description, style]} {...props}>
    {children}
  </Text>
))
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef(({ style, children, ...props }, ref) => (
  <View ref={ref} style={[styles.content, style]} {...props}>
    {children}
  </View>
))
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef(({ style, children, ...props }, ref) => (
  <View ref={ref} style={[styles.footer, style]} {...props}>
    {children}
  </View>
))
CardFooter.displayName = 'CardFooter'

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',     // gray-200
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'column',
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',            // gray-900
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',            // gray-500
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
})
