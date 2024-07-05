/**
 * External dependencies.
 */
import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	Dropdown,
	DateTimePicker,
} from '@wordpress/components';

/**
 * Use the `DateTimeControl` component to display accessible dates & times.
 *
 * @param {Object}   props                   Component properties.
 * @param {string}   props.label             Component label text.
 * @param {string}   props.help              Component help text.
 * @param {string}   props.className         Component class.
 * @param {string}   props.popoverProps      Pop over position.
 * @param {string}   props.buttonVariant     Button variant.
 * @param {string}   props.buttonPlaceholder Button placeholder label.
 * @param {string}   props.currentDateTime   Current component value.
 * @param {boolean}  props.is12Hour          Whether we use a 12-hour clock.
 * @param {number}   props.startOfWeek       The day that the week should start on.
 * @param {Function} props.onChange          On Change function.
 * @return {ReactNode} - Component.
 */
const DateTimeControl = ( {
	label,
	help,
	className,
	popoverProps,
	buttonVariant,
	buttonPlaceholder,
	currentDateTime,
	is12Hour,
	startOfWeek,
	onChange
} ) => {
	return (
		<BaseControl
			label={ label }
			help={ help }
			className={ classnames( 'ks-date-time-control', className, ) }
		>
			<Dropdown
				popoverProps={ { placement: popoverProps } }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						variant={ buttonVariant }
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ currentDateTime ? currentDateTime.toString() : buttonPlaceholder }
					</Button>
				) }
				renderContent={ () => (
					<DateTimePicker
						currentDate={ currentDateTime && '' !== currentDateTime ? currentDateTime : null }
						onChange={ onChange }
						is12Hour={ is12Hour }
						startOfWeek={ startOfWeek }
					/>
				) }
			/>
		</BaseControl>
	);
};

DateTimeControl.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	help: PropTypes.string,
	popoverProps: PropTypes.string,
	buttonVariant: PropTypes.string,
	buttonPlaceholder: PropTypes.string,
	currentDateTime: PropTypes.string.isRequired,
	is12Hour: PropTypes.boolean,
	startOfWeek: PropTypes.number,
	onChange: PropTypes.func.isRequired
};

DateTimeControl.defaultProps = {
	popoverProps: 'bottom-start',
	buttonVariant: 'secondary',
	currentDateTime: null,
	is12Hour: false,
	startOfWeek: 0,
};

export default DateTimeControl;