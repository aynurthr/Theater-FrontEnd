import { teamMembers } from "../../common/theater-team.js";

document.addEventListener("DOMContentLoaded", function () {
  const teamWrapper = document.getElementById("team-wrapper");

  const founderMember = teamMembers.find(
    (member) => member.title === "Founder and Artistic Director"
  );
  const otherMembers = teamMembers.filter(
    (member) => member.title !== "Founder and Artistic Director"
  );

  // Add other team members first
  otherMembers.forEach((member) => {
    const teamMemberDiv = document.createElement("div");
    teamMemberDiv.classList.add("team-member");
    teamMemberDiv.innerHTML = `
      <img src="${member.imageSrc}" alt="${member.name}">
      <div>
      <h2>${member.name}</h2>
      <h3>${member.title}</h3>
      <p>${member.bio}</p></div>
    `;
    teamWrapper.appendChild(teamMemberDiv);
  });

  // Add the founder member in the middle
  const founderDiv = document.createElement("div");
  founderDiv.classList.add("team-member", "founder");
  founderDiv.innerHTML = `
    <img src="${founderMember.imageSrc}" alt="${founderMember.name}">
    <div>
    <h2>${founderMember.name}</h2>
    <h3>${founderMember.title}</h3>
    <p>${founderMember.bio}</p></div>
  `;

  // Insert founder in the middle
  const middleIndex = Math.floor(otherMembers.length / 2);
  teamWrapper.insertBefore(founderDiv, teamWrapper.children[middleIndex]);
});
