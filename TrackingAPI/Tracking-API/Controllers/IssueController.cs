using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tracking_API.Data;
using Tracking_API.Models;

namespace Tracking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueController : ControllerBase
    {
        private readonly IssueDbContext _context;

        public IssueController(IssueDbContext context) => _context = context;
        
        [HttpGet]
        public async Task<IEnumerable<Issue>> Get()
        {
            return await _context.Issues.ToListAsync();
        }

        //This method is not used in the UI.
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Issue), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var issue = await _context.Issues.FindAsync(id);
            return issue == null ? NotFound() : Ok(issue);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IEnumerable<Issue>> Create(Issue issue)
        {
            _context.Issues.Add(issue);
            await _context.SaveChangesAsync();

            return await _context.Issues.ToListAsync();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IEnumerable<Issue>> Update(Issue issue)
        {
            var dbIssue = await _context.Issues.FindAsync(issue.Id);
            if (dbIssue == null)
                return (IEnumerable<Issue>)BadRequest("Issue not found.");

            dbIssue.Title = issue.Title;
            dbIssue.Description = issue.Description;
            dbIssue.Priority = issue.Priority;
            dbIssue.Type = issue.Type;

            await _context.SaveChangesAsync();

            return await _context.Issues.ToListAsync();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IEnumerable<Issue>> Delete(int id)
        {
            var issueToDelete = await _context.Issues.FindAsync(id);
            if (issueToDelete == null) return (IEnumerable<Issue>)NotFound();

            _context.Issues.Remove(issueToDelete);
            await _context.SaveChangesAsync();

            return await _context.Issues.ToListAsync();
        }
    }
}
