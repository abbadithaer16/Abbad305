import {
  Activity,
  AirVent,
  BatteryCharging,
  BatteryFull,
  BatteryWarning,
  CircleGauge,
  CircuitBoard,
  Cpu,
  Disc3,
  Fan,
  Gauge,
  PlugZap,
  ScanSearch,
  ShieldCheck,
  Snowflake,
  Thermometer,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icons you can use for services in center.config.ts (`icon: 'battery'`).
 * To add one: import it from lucide-react (https://lucide.dev/icons) and add a key here.
 */
export const serviceIcons = {
  battery: BatteryCharging,
  batteryReplace: BatteryFull,
  batteryWarning: BatteryWarning,
  inverter: CircuitBoard,
  evBattery: PlugZap,
  chip: Cpu,
  diagnostics: ScanSearch,
  ac: Snowflake,
  airVent: AirVent,
  brakes: Disc3,
  maintenance: Wrench,
  gauge: Gauge,
  circleGauge: CircleGauge,
  cooling: Fan,
  temperature: Thermometer,
  activity: Activity,
  shield: ShieldCheck,
  truck: Truck,
} satisfies Record<string, LucideIcon>;

export type ServiceIcon = keyof typeof serviceIcons;
