// The globals available to every previewCode snippet rendered by react-live.
// Keep this list in sync with scripts/lib/scope-names.mjs (used by the preview checker).
import * as React from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  animate,
  useAnimate,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bell, Bookmark, Calendar, Check, ChevronDown, ChevronRight,
  Circle, Clock, Coffee, Command, Compass, Copy, Eye, Feather, Folder, Globe, Grid3x3, Hand, Heart,
  Home, Image, Inbox, Layers, Leaf, Lock, Mail, MapPin, Menu, Minus, Moon, MousePointer2, Music,
  Pause, PenTool, Play, Plus, Search, Send, Settings, ShoppingBag, Sparkle, Square, Star, Sun,
  Triangle, Type, User, X, Zap,
} from "lucide-react";

export const icons = {
  ArrowLeft, ArrowRight, ArrowUpRight, Bell, Bookmark, Calendar, Check, ChevronDown, ChevronRight,
  Circle, Clock, Coffee, Command, Compass, Copy, Eye, Feather, Folder, Globe, Grid3x3, Hand, Heart,
  Home, Image, Inbox, Layers, Leaf, Lock, Mail, MapPin, Menu, Minus, Moon, MousePointer2, Music,
  Pause, PenTool, Play, Plus, Search, Send, Settings, ShoppingBag, Sparkle, Square, Star, Sun,
  Triangle, Type, User, X, Zap,
};

export const liveScope = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
  useMemo: React.useMemo,
  useCallback: React.useCallback,
  useId: React.useId,
  useLayoutEffect: React.useLayoutEffect,
  motion,
  AnimatePresence,
  LayoutGroup,
  animate,
  useAnimate,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  ...icons,
};
