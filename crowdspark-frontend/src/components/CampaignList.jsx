import CampaignCard from './CampaignCard';

const dummyCampaigns = [
  {
    id: 1,
    title: 'Water for All',
    description: 'Bringing clean water to remote villages.',
  },
  {
    id: 2,
    title: 'Educate Every Child',
    description: 'Support free schooling for underprivileged kids.',
  },
];

export default function CampaignList() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto p-6">
      {dummyCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
