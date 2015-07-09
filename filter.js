$(function () {
    'use strict';

    /**
     * Add items from a dropdown into a filter list
     * <select data-filter data-target=".element-to-insert-into"></select>
     *
     * Events triggered:
     * md-filter.added
     *      data (of item added): {
     *          tag: selectElement.getAttribute('data-tag'),
     *          value: optionElement.value
     *      }
     * md-filter.removed
     *      data (of item removed): {
     *          tag: selectElement.getAttribute('data-tag'),
     *          value: optionElement.value
     *      }
     */

    var $target,
        $targets = {},
        label,
        tag,
        target,
        value;

    $('select[data-filter]').on('change', function () {
        target = this.getAttribute('data-target');

        if (!target || this.selectedIndex === 0) return;

        // Add the target to list of targets so we don't have to create a jQuery object on each change
        if (!$targets[target]) $targets[target] = $(target);
        $target = $targets[target];

        // Get the currently selected label and associated data: tag and value
        label = this.options[this.selectedIndex].text;
        tag = this.getAttribute('data-tag');
        value = this.value;

        // Create a new filter item if it doesn't already exist
        if ($target.find('[data-tag="' + tag + '"][data-value="' + value + '"]').length === 0) {
            $('<div class="md-filter-item"></div>')             // Create new item
                .text(label)                                    // Apply the label
                .attr('data-tag', tag)                          // Store the tag
                .attr('data-value', value)                      // Store the value
                .append('<i class="fa fa-times md-close"></i>') // Add close button
                .on('click', function (e) {                     // Add listener for removing from list
                    var $this = $(this);
                    e.target.classList.contains('md-close') && $this.remove();
                    $target.trigger('md-filter.removed', { tag: $this.data('tag'), value: $this.data('value') });
                })
                .appendTo($target);
            $target.trigger('md-filter.added', { tag: tag, value: value });
        }

        this.selectedIndex = 0;
    });
});