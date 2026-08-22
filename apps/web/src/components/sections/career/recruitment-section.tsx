/**
 * sections.recruitment-section (채용 안내)
 * ========================================
 * talent diagram + process steps
 *
 * [Main Functions]
 * - RecruitmentSection
 *
 * [Dependencies]
 * - sections/career/*
 */

import { ProcessSteps } from '@/components/sections/career/process-steps';
import { TalentDiagram } from '@/components/sections/career/talent-diagram';

type RecruitmentSectionProps = {
  locale: 'ko' | 'en';
};

// 1. RecruitmentSection
export async function RecruitmentSection({ locale }: RecruitmentSectionProps) {
  return (
    <>
      <TalentDiagram locale={locale} />
      <ProcessSteps locale={locale} />
    </>
  );
}
