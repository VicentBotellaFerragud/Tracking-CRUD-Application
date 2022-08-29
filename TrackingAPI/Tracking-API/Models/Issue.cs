using System.ComponentModel.DataAnnotations;

namespace Tracking_API.Models
{
    public class Issue
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public Priotity Priority { get; set; }
        public Type Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? Completed { get; set; }
    }

    public enum Priotity
    {
        Low, Medium, High
    }

    public enum Type
    {
        Feature, Bug, Documentation
    }
}
