/**
 * Email service removed (EmailJS). Fallback: queue messages locally.
 */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(
  data: ContactFormData
): Promise<{ success: boolean; queued?: boolean; error?: string }> {
  try {
    // EmailJS and third-party delivery removed by request.
    // Fallback: store message locally so it can be reviewed and delivered manually.
    storeEmailLocally(data);
    return { success: true, queued: true };
  } catch (err) {
    console.error("Failed to queue message:", err);
    return { success: false, queued: true, error: "Failed to queue message" };
  }
}

function storeEmailLocally(data: ContactFormData): void {
  try {
    const queue = JSON.parse(localStorage.getItem("email_queue") || "[]");
    queue.push({
      ...data,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("email_queue", JSON.stringify(queue));
    console.log("Message queued locally");
  } catch (error) {
    console.error("Failed to store message locally:", error);
  }
}

export function getQueuedEmails(): Array<
  ContactFormData & { timestamp: string }
> {
  try {
    return JSON.parse(localStorage.getItem("email_queue") || "[]");
  } catch {
    return [];
  }
}

export function clearEmailQueue(): void {
  localStorage.removeItem("email_queue");
}
