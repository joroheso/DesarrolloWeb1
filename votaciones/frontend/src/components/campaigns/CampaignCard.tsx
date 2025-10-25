export default function CampaignCard({ campaign }: { campaign: any }) {
  return (
    <div className="card">
      <h4>{campaign.title}</h4>
      <p>{campaign.description}</p>
      <a href={`/campaigns/${campaign.id}`}>Ver detalles</a>
    </div>
  );
}