const fs = require('fs');

const filesToFix = [
  "src/components/booking/AvailabilityResults.tsx",
  "src/components/booking/BookingFlow.tsx",
  "src/components/booking/GuestDetailsForm.tsx",
  "src/components/profile/EditReservationModal.tsx",
  "src/components/profile/ProfileSidebar.tsx",
  "src/components/profile/ReservationList.tsx",
  "src/components/restaurant/RestaurantReservationForm.tsx",
  "src/components/rooms/stage/StageTitleBlock.tsx"
];

for (const file of filesToFix) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('const tr = useDictionary();')) {
    // Find the first block that looks like the main component body
    // We'll look for `export function` or `export default function` followed by `{`
    content = content.replace(/(export (?:default )?function\s+[A-Za-z0-9_]+[^{]*\{)/, '$1\n  const tr = useDictionary();');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed component', file);
  }
}
