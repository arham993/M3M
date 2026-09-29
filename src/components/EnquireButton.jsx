import { useEnquiry } from '../lib/EnquiryContext.jsx';

/**
 * Any button that opens the enquiry popup.
 * variant "enquire" = highlighted dark pill with copper ring and pulse (lead CTAs).
 * `type` sets the popup heading; defaults to the button label.
 */
export default function EnquireButton({
  children, type, variant = 'enquire', small = false, icon: Icon, className = '', onBeforeOpen, ...rest
}) {
  const { openEnquiry } = useEnquiry();
  const label = typeof children === 'string' ? children : 'Enquire Now';
  const classes = ['btn', `btn-${variant}`, small && 'btn-sm', className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={() => { onBeforeOpen?.(); openEnquiry(type || label); }}
      {...rest}
    >
      {variant === 'enquire' && <span className="spark" aria-hidden="true" />}
      {Icon && <Icon aria-hidden="true" />}
      {children}
    </button>
  );
}
