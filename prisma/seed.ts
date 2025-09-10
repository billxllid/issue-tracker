import { PrismaClient, Status } from '@/app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.issue.createMany({
    data: [
      {
        title: "Login page loads too slowly",
        description: "Users report that the login page takes over 5 seconds to load on mobile devices.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-01T10:15:00Z"),
        updatedAt: new Date("2025-08-01T10:15:00Z"),
      },
      {
        title: "Payment callback error",
        description: "Some payments succeed but order status is not updated due to signature validation failure.",
        status: Status.IN_PROGRESS,
        createdAt: new Date("2025-08-02T09:30:00Z"),
        updatedAt: new Date("2025-08-03T11:00:00Z"),
      },
      {
        title: "Typo fixes in user guide",
        description: "Several typos were found in Chapter 3 of the documentation and must be corrected.",
        status: Status.CLOSED,
        createdAt: new Date("2025-07-28T14:20:00Z"),
        updatedAt: new Date("2025-07-30T09:00:00Z"),
      },
      {
        title: "Add OAuth login support",
        description: "Enable users to log in via Google and GitHub for better experience.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-04T08:10:00Z"),
        updatedAt: new Date("2025-08-04T08:10:00Z"),
      },
      {
        title: "Inconsistent API responses",
        description: "API returns different JSON structures between staging and production environments.",
        status: Status.IN_PROGRESS,
        createdAt: new Date("2025-08-05T15:00:00Z"),
        updatedAt: new Date("2025-08-06T10:30:00Z"),
      },
      {
        title: "Avatar upload fails",
        description: "Some users encounter 500 errors when uploading profile pictures larger than 5MB.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-07T12:45:00Z"),
        updatedAt: new Date("2025-08-07T12:45:00Z"),
      },
      {
        title: "Password reset email not sent",
        description: "Password reset requests are not triggering emails to users.",
        status: Status.CLOSED,
        createdAt: new Date("2025-07-25T18:00:00Z"),
        updatedAt: new Date("2025-07-26T09:20:00Z"),
      },
      {
        title: "UI buttons misaligned in Safari",
        description: "Several buttons appear out of alignment in Safari browser.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-08T07:30:00Z"),
        updatedAt: new Date("2025-08-08T07:30:00Z"),
      },
      {
        title: "Log files grow too large",
        description: "Application logs increase rapidly and consume too much disk space.",
        status: Status.IN_PROGRESS,
        createdAt: new Date("2025-07-29T13:40:00Z"),
        updatedAt: new Date("2025-08-01T09:10:00Z"),
      },
      {
        title: "Add dark mode",
        description: "Users requested a dark theme for better experience at night.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-09T16:25:00Z"),
        updatedAt: new Date("2025-08-09T16:25:00Z"),
      },
      {
        title: "Search functionality broken",
        description: "Search results page does not display any items even when matches exist.",
        status: Status.IN_PROGRESS,
        createdAt: new Date("2025-08-03T11:15:00Z"),
        updatedAt: new Date("2025-08-05T10:00:00Z"),
      },
      {
        title: "Broken links in FAQ",
        description: "Several links in the FAQ section lead to 404 pages.",
        status: Status.CLOSED,
        createdAt: new Date("2025-07-27T09:45:00Z"),
        updatedAt: new Date("2025-07-28T14:00:00Z"),
      },
      {
        title: "Add pagination to admin dashboard",
        description: "Admin dashboard crashes when too many items are displayed without pagination.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-10T09:00:00Z"),
        updatedAt: new Date("2025-08-10T09:00:00Z"),
      },
      {
        title: "Notification service timeout",
        description: "Push notifications are delayed by more than 2 minutes due to service timeouts.",
        status: Status.IN_PROGRESS,
        createdAt: new Date("2025-08-06T13:00:00Z"),
        updatedAt: new Date("2025-08-07T15:10:00Z"),
      },
      {
        title: "Improve password policy",
        description: "Require stronger password rules to prevent weak user credentials.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-11T08:20:00Z"),
        updatedAt: new Date("2025-08-11T08:20:00Z"),
      },
      {
        title: "Crash on iOS devices",
        description: "App crashes when users open the profile page on iOS 17.",
        status: Status.IN_PROGRESS,
        createdAt: new Date("2025-08-12T10:40:00Z"),
        updatedAt: new Date("2025-08-13T11:15:00Z"),
      },
      {
        title: "Fix email template formatting",
        description: "Marketing emails render incorrectly in Outlook 2019.",
        status: Status.CLOSED,
        createdAt: new Date("2025-07-30T07:15:00Z"),
        updatedAt: new Date("2025-07-31T10:00:00Z"),
      },
      {
        title: "Add multi-language support",
        description: "Support English, Spanish, and French in the user interface.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-13T12:00:00Z"),
        updatedAt: new Date("2025-08-13T12:00:00Z"),
      },
      {
        title: "Export data as CSV",
        description: "Allow users to export their account data in CSV format.",
        status: Status.IN_PROGRESS,
        createdAt: new Date("2025-08-14T09:25:00Z"),
        updatedAt: new Date("2025-08-15T11:30:00Z"),
      },
      {
        title: "Session timeout too short",
        description: "Users are logged out after only 5 minutes of inactivity, needs extension.",
        status: Status.OPEN,
        createdAt: new Date("2025-08-15T10:50:00Z"),
        updatedAt: new Date("2025-08-15T10:50:00Z"),
      }
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })