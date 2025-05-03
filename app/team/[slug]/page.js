import TeamDetail from "@/components/team-detail"

export default function TeamMemberPage({ params }) {
  // In a real application, you would fetch the team member data based on the slug
  // For now, we'll just pass the slug to the TeamDetail component
  return <TeamDetail />
}
