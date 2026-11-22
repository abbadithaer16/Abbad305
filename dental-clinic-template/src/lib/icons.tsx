import {
  AlignHorizontalDistributeCenter,
  Armchair,
  Award,
  Baby,
  BadgeCheck,
  Clock,
  Crown,
  Languages,
  Microscope,
  MonitorCheck,
  ScanLine,
  Screw,
  ShieldCheck,
  Siren,
  Smile,
  Sparkles,
  Stethoscope,
  Toothbrush,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from './types';

/** Icon names usable in clinic.config.ts → lucide icons. */
export const icons: Record<IconName, LucideIcon> = {
  implant: Screw,
  veneers: Smile,
  whitening: Sparkles,
  orthodontics: AlignHorizontalDistributeCenter,
  'root-canal': Microscope,
  kids: Baby,
  cleaning: Toothbrush,
  crown: Crown,
  gum: BadgeCheck,
  emergency: Siren,
  checkup: Stethoscope,
  equipment: MonitorCheck,
  sterilization: ShieldCheck,
  payment: Wallet,
  comfort: Armchair,
  scan: ScanLine,
  award: Award,
  clock: Clock,
  languages: Languages,
  family: Users,
};

export function Icon({ name, className, strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const Cmp = icons[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
