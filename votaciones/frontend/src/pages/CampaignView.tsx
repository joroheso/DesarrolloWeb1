import { useParams } from "react-router-dom";
import CampaignDetail from "../components/campaigns/CampaignDetail";

export default function CampaignView() {
  const { id } = useParams();
  return <div className="container"><CampaignDetail id={Number(id)} /></div>;
}