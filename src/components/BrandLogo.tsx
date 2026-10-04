type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export default function BrandLogo({ compact = false, className = '' }: BrandLogoProps) {
  const LOGO_URL = '/isofon-logo.png';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={LOGO_URL}
        alt="İSOFON Logo"
        className={`${compact ? 'h-8' : 'h-11'} w-auto object-contain`}
      />
    </div>
  );
}
