"use client";

const CURRENT_YEAR = 2026;

export const LandingFooter = () => {
  return (
    <footer className="py-6 text-center text-xs text-[#6F7771] border-t border-[#E3E9E4]">
      <p>
        © {CURRENT_YEAR} FinGestão. Todos os direitos reservados.
      </p>
    </footer>
  );
};